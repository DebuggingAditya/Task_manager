import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.taskModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Task not found');
    return { message: 'Task deleted successfully' };
  }
}