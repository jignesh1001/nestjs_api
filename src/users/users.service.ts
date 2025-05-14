import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';  
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {

    private users = [
        // ✅ OK — although type annotation is recommended for stricter checks
        {
            "id": 1, // ✅ OK — quotes around keys are allowed (but not necessary in JS/TS)
            "name": "Jhon Doe",
            "email": "Jhon@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 2,
            "name": "Alice Smith",
            "email": "alice.smith@example.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Bob Johnson",
            "email": "bob.johnson@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Carol White",
            "email": "carol.white@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "David Lee",
            "email": "david.lee@example.com",
            "role": "ENGINEER"
        }
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray =  this.users.filter(user => user.role === role); 
            if(rolesArray.length === 0) throw new
            NotFoundException('User role not found')
            return rolesArray
        }
        return this.users; // ✅ OK
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id); // ✅ OK
        if(!user) throw new NotFoundException('User not found');
        return user; // ✅ OK
    }

    create(createUserDto:CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id : usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser   
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user =>{
            if(user.id === id ){
                return {...user,...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }

}
