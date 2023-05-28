import { connectToMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    connectToMongoDB().catch(err => NextResponse.json(err))

    const { name, email, phone } = await req.json()

    const userExists = await User.findOne({ email })

    if (userExists) {
        return NextResponse.json({ error: "User Already exists" })
    }
    else {
        try {
            const newUser = await User.create({
                name,
                email,
                phone
            })

            return NextResponse.json({
                success: true,
                user: newUser
            }, { status: 201 })

        } catch (error: unknown) {
            if (error && error instanceof mongoose.Error.ValidationError) {
                for (let field in error.errors) {
                    const msg = error.errors[field].message
                    return NextResponse.json({ error: msg })
                }
            }
            else {
                return NextResponse.json(error)
            }
        }
    }
}

export async function GET(req: NextRequest) {
    connectToMongoDB().catch(err => NextResponse.json(err))

    try {
        const allUsers = await User.find()

        return NextResponse.json({
            success: true,
            users: allUsers
        })

    } catch (error) {
        return NextResponse.json({ error: error })
    }
}