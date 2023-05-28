import { connectToMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type ApiParams = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: ApiParams) {

    connectToMongoDB().catch(err => NextResponse.json(err))

    try {
        const user = await User.findOne({ _id: params.id })

        if (user) {
            return NextResponse.json({
                success: true,
                user
            })
        }
        else {
            return NextResponse.json({ error: "User does not exists" }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(req: NextRequest, { params }: ApiParams) {

    connectToMongoDB().catch(err => NextResponse.json(err))

    const { name, email, phone } = await req.json()

    try {
        const user = await User.findOne({ _id: params.id })

        if (user) {
            // Write code to update it
            user.name = name;
            user.email = email;
            user.phone = phone;

            await user.save();

            return NextResponse.json({
                success: true,
                user
            })
        }
        else {
            return NextResponse.json({ error: "User does not exists" }, { status: 404 })
        }
    } catch (error) {
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

export async function DELETE(req: NextRequest, { params }: ApiParams) {

    connectToMongoDB().catch(err => NextResponse.json(err))

    try {
        const user = await User.findOneAndDelete({ _id: params.id })

        if (user) {
            return NextResponse.json({
                success: true,
                user
            })
        }
        else {
            return NextResponse.json({ error: "User doesn't exists" }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}