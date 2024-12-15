import mongoose, {Schema, Document, Model} from 'mongoose'
import bcrypt from 'bcrypt'

main().catch(err => console.log(err));

async function main() {
    // console.log("hi")
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

interface User extends Document {
    name: string;
    password: string;
    data : any
}

export interface UserDTOSign {
    name: string;
    password: string;
}

export interface UserDTOData {
    name: string;
    data: any;
}

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    password: {type: String, required: true},
    data: Schema.Types.Mixed
})

const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);



export async function appendUser(user: UserDTOSign): Promise<User> {
    let res = await UserModel.create(user)
    return res
}

export async function checkNameExist({name}: UserDTOSign): Promise<boolean> {
    return (await UserModel.find({name,})).length > 0
}

export async function checkLogin({name, password}: UserDTOSign): Promise<boolean> {
    const user = await getUser(name)
    if (!user) return false
    // console.log("get user", user)
    return bcrypt.compare(password, user.password)
    
    // return (await UserModel.find({name, password})).length === 1;
}

export function getUser(name: string): Promise<User | null> {
    return UserModel.findOne({name});
}

export async function getData(name: string): Promise<UserDTOData> {
    const user = await UserModel.findOne({name});
    if (user) return {name: user.name, data: user.data}
    return {name: "", data: "Error in geting data"}
}

export async function setData({data, name}: UserDTOData) {
    await UserModel.findOneAndUpdate({name}, {data});
}





