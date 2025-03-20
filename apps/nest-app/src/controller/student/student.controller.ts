import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { UpdateStudentDto } from '../../dto/update-student.dto';
import { StudentService } from '../../service/student/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    const newStudent =
      await this.studentService.createStudent(createStudentDto);
    return newStudent;
  }

  @Put('/:id')
  async updateStudent(
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const existingStudent = await this.studentService.updateStudent(
      studentId,
      updateStudentDto,
    );
    return existingStudent;
  }

  @Get()
  async getStudents() {
    const studentData = await this.studentService.getAllStudents();
    return studentData;
  }

  @Get('/:id')
  async getStudent(@Param('id') studentId: string) {
    const existingStudent = await this.studentService.getStudent(studentId);
    return existingStudent;
  }

  @Delete('/:id')
  async deleteStudent(@Param('id') studentId: string) {
    const deletedStudent = await this.studentService.deleteStudent(studentId);
    return deletedStudent;
  }
}
