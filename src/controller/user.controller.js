import { dbConnection } from "@/lib/dbconnect";
import {userModel } from "@/models/user.model";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import { signupValidation, UserInput } from "@/schema/signupSchema";

export async function register(xl) {
   
}

