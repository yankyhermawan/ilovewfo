import { prismaService, prismaServiceWithUserPassword } from '../prisma.service'
import { User, LoginUser, ForgetPassword } from './user.interface'
import { ResponseInterface } from '../utility/response'
import { StatusCodes } from 'http-status-codes'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import moment from 'moment'
import { transporter } from '../utility/mailer'
import omit from 'lodash/omit'

export default class UserAuth {
    async register(data: User): Promise<ResponseInterface> {
        const userExist = await prismaService.user.findUnique({
            where: {
                username: data.username
            }
        })
        if (userExist) {
            return {
                status: StatusCodes.BAD_REQUEST,
                errorMessage: 'User already registered'
            }
        }
        const response = await prismaService.user.create({
            data: {
                ...data,
                password: bcrypt.hashSync(data.password, Number(process.env.HASH_SALT))
            },
            omit: {
                password: true
            }
        })
        return {
            status: StatusCodes.CREATED,
            data: response
        }
    }

    async login(data: LoginUser): Promise<ResponseInterface> {
        const user = await prismaServiceWithUserPassword.user.findUnique({
            where: { username: data.username }
        })
        if (!user) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'User not found'
            }
        }
        const isPasswordMatch = bcrypt.compareSync(data.password, user.password)
        if (!isPasswordMatch) {
            return {
                status: StatusCodes.BAD_REQUEST,
                errorMessage: 'Password Mismatch'
            }
        }
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = jwt.sign(payload, String(process.env.JWT_KEY), {
            expiresIn: '7d',
            algorithm: 'HS256'
        })
        const response = {
            ...omit(user, ['password']),
            token
        }
        return {
            status: StatusCodes.OK,
            data: response
        }
    }

    async generateOtp(username: string): Promise<ResponseInterface> {
        const user = await prismaService.user.findUnique({
            where: { username }
        })
        if (!user) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'User not found'
            }
        }
        const otpNumber = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
        const otp = await prismaService.otp.create({
            data: {
                user_id: user.id,
                otp_number: Number(otpNumber),
                is_valid: 1,
                valid_until: moment().add(5, 'minutes').toISOString()
            }
        })
        if (otp) {
            await transporter.sendMail({
                from: '"Yanky Hermawan" <yanky.hermawan@movingbytesplayground.com>',
                to: user.email,
                subject: 'OTP Number',
                text: `Your OTP Number is: ${otpNumber}`
            })
            return {
                status: StatusCodes.CREATED,
                data: { message: 'OTP Created' }
            }
        }
        return {
            status: StatusCodes.BAD_REQUEST,
            errorMessage: 'Error Creating OTP'
        }
    }

    async forgetPassword(data: ForgetPassword): Promise<ResponseInterface> {
        const user = await prismaService.user.findUnique({
            where: { username: data.username }
        })
        if (!user) {
            return {
                status: StatusCodes.NOT_FOUND,
                errorMessage: 'User not found'
            }
        }
        const otp = await prismaService.otp.findFirst({
            where: {
                user_id: user.id,
                otp_number: data.otp_number,
                is_valid: 1
            }
        })
        if (!otp) {
            return {
                status: StatusCodes.BAD_REQUEST,
                errorMessage: 'Invalid OTP'
            }
        }
        const isOtpExpired = moment().isSameOrBefore(moment(otp.valid_until))
        if (!isOtpExpired) {
            return {
                status: StatusCodes.BAD_REQUEST,
                errorMessage: 'Otp expired'
            }
        }
        const updatedPassword = await prismaService.user.update({
            omit: { password: true },
            data: { password: bcrypt.hashSync(data.new_password, Number(process.env.HASH_SALT)) },
            where: { id: user.id }
        })
        await prismaService.otp.delete({ where: { id: otp.id } })
        return {
            status: StatusCodes.OK,
            data: updatedPassword
        }
    }
}