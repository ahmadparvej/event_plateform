"use server";

// Assuming you have a User model and necessary dependencies

import { CreateUserParams, UpdateUserParams } from "@/types/index";
import { handleError } from "./../utils";
import { connectedToDatabase } from "../database/index";
import User from "../database/models/user.model";
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { revalidatePath } from "@/node_modules/next/cache";

export const createUser = async (user: CreateUserParams) => {
  try {
    // Validate user input if needed
    await connectedToDatabase();

    // Create a new user using the User model
    const newUser = new User(user);

    // Save the new user to the database
    // await newUser.save();

    // You can perform additional actions here if needed

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // Handle any errors, log them, or throw them if necessary
    handleError(error);
    return null;
  }
};

export async function getUserById(userId: string) {
    try {
      await connectedToDatabase()
  
      const user = await User.findById(userId)
  
      if (!user) throw new Error('User not found')
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      handleError(error)
    }
  }
  
  export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
      await connectedToDatabase()
  
      const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })
  
      if (!updatedUser) throw new Error('User update failed')
      return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
      handleError(error)
    }
  }
  
  export async function deleteUser(clerkId: string) {
    try {
      await connectedToDatabase()
  
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId })
  
      if (!userToDelete) {
        throw new Error('User not found')
      }
  
      // Unlink relationships
      await Promise.all([
        // Update the 'events' collection to remove references to the user
        Event.updateMany(
          { _id: { $in: userToDelete.events } },
          { $pull: { organizer: userToDelete._id } }
        ),
  
        // Update the 'orders' collection to remove references to the user
        Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
      ])
  
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id)
      revalidatePath('/')
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
      handleError(error)
    }
  }
