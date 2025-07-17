import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {isValidObjectId} from "mongoose";
import { Student } from "../models/student.models.js";


const generateAccessAndRefreshToken = async (studentId) => {
    try {
        const student = await Student.findById(studentId)

        if (!student) {
            throw new ApiError(400, "User doesn't exist")
        }

        const accessToken = student.generateAccessToken()
        const refreshToken = student.generateRefreshToken()

        student.refreshToken = refreshToken
        await student.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}


const registerStudent = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body

    if (
        [fullname, email, password].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "Please fill all details")
    }

    if (await Student.findOne({ email })) {
        throw new ApiError(400, "Student already exist")
    }



    try {
        const student = await Student.create({
            fullname,
            email,
            password,
            fees_status: false
        })

        const createdStudent = await Student.findOne(
            { email }
        )

        if (createdStudent) {
            console.log("Student registered")
        }

        return res.status(200).json(new ApiResponse(
            200,
            createdStudent,
            "Student registered successfully"
        ))

    } catch (error) {
        console.log("Something went wrong registering", error)
        throw new ApiError(500, "Something went wrong registering student")
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (
        [email, password].some((field) => field.trim() === "")
    ) {
        throw new ApiError("Please fill all details")
    }

    const student = await Student.findOne({ email })

    if (!student) {
        console.log("Please register first")
        throw new ApiError(400, "Student not registered")
    }

    const isPasswordValid = await student.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(student._id)

    const loggedInStudent = await Student.findById(student._id)
        .select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            { student: loggedInStudent, accessToken, refreshToken },
            "Student logged in successfully"
        ))

})

const updateDetails = asyncHandler(async (req, res) => {
    const {fullname, email} = req.body

    const studentId = req.student?._id

    if(!isValidObjectId(studentId)) {
        throw new ApiError(400, "Enter valid Id")
    }

    const student = await Student.findByIdAndUpdate(
        studentId,
        {
            $set: {
                fullname,
                email
            }
        },
        {new: true}
    )

    return res.status(200).json(new ApiResponse(
        200,
        student,
        "Details updated successfully"
    ))

})

const toggleFees = asyncHandler(async (req, res) => {
    const studentId = req.student?._id

    if(!isValidObjectId(studentId)) {
        throw new ApiError(400, "Enter valid student id")
    }

    const student = await Student.findByIdAndUpdate(
        studentId,
        {
            $set: {
                fees_status: true
            }
        },
        {new: true}
    )

    res.status(200).json(new ApiResponse(
        200,
        student,
        "Fees payment made true"
    ))

})

const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find()

    return res.status(200).json(new ApiResponse(
        200,
        students,
        "All the registered students"
    ))
})

const logout = asyncHandler(async (req, res) => {
    await Student.findByIdAndUpdate(
        req.student._id,
        {
            $set: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(
            200,
            {},
            "Student logged out successfully"
        ))

})

const currentStudent = asyncHandler(async (req, res) => {

    return res.status(200).json(new ApiResponse(
        200,
        req.student._id,
        "Current user fetched succesfully"
    ))
})

export {
    registerStudent,
    login,
    updateDetails,
    toggleFees,
    getAllStudents,
    logout,
    currentStudent
}