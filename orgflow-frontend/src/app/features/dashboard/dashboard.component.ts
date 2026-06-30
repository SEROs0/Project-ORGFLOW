import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

interface StatCard {
  label: string;
  value: number;
  sub: string;
  subClass: string;
}

interface KanbanTask {
  title: string;
  tags: { label: string; color: string }[];
  assignee: string;
}

interface KanbanColumn {
  title: string;
  count: number;
  tasks: KanbanTask[];
}

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  auth = inject(AuthService);

  stats: StatCard[] = [
    { label: 'งานทั้งหมด', value: 48, sub: '↑ 6 สัปดาห์นี้', subClass: 'up' },
    { label: 'คำสั่งทำ', value: 12, sub: '4 คนรับผิดชอบ', subClass: 'neutral' },
    { label: 'เสร็จแล้ว', value: 31, sub: '65% อัตราสำเร็จ', subClass: 'up' },
    { label: 'เกิน deadline', value: 5, sub: '5 ต้องแก้ไขด่วน', subClass: 'down' },
  ];

  columns: KanbanColumn[] = [
    {
      title: 'Todo',
      count: 5,
      tasks: [
        {
          title: 'ออกแบบ API spec สำหรับ Notification',
          tags: [{ label: 'Backend', color: 'purple' }, { label: 'สูง', color: 'red' }],
          assignee: 'จ',
        },
        {
          title: 'เขียน Unit test ระบบ Auth',
          tags: [{ label: 'Test', color: 'blue' }, { label: 'กลาง', color: 'yellow' }],
          assignee: 'ธ',
        },
      ],
    },
    {
      title: 'In progress',
      count: 4,
      tasks: [
        {
          title: 'สร้าง CRUD API สำหรับ Task management',
          tags: [{ label: 'Backend', color: 'purple' }, { label: 'ด่วน', color: 'red' }],
          assignee: 'ก',
        },
        {
          title: 'เชื่อม Frontend กับ Login endpoint',
          tags: [{ label: 'Frontend', color: 'green' }, { label: 'กลาง', color: 'yellow' }],
          assignee: 'น',
        },
      ],
    },
    {
      title: 'Done',
      count: 3,
      tasks: [
        {
          title: 'ตั้งค่า Database schema และ Migration',
          tags: [{ label: 'DB', color: 'blue' }, { label: 'แล้ว', color: 'green' }],
          assignee: 'จ',
        },
        {
          title: 'ทำ JWT Authentication ระบบ Login',
          tags: [{ label: 'Auth', color: 'purple' }, { label: 'แล้ว', color: 'green' }],
          assignee: 'ธ',
        },
      ],
    },
  ];

  members = [
    { name: 'วิชัย', initials: 'ว', progress: 82, color: '#22c55e' },
    { name: 'สิทธิ์', initials: 'ส', progress: 70, color: '#a78bfa' },
    { name: 'ควิน', initials: 'ก', progress: 55, color: '#3b82f6' },
    { name: 'นภา', initials: 'น', progress: 40, color: '#f59e0b' },
  ];

  notifications = [
    { message: 'ควิน ได้รับมอบหมายงานใหม่', time: '10 นาทีที่แล้ว', type: 'info', initials: 'ก' },
    { message: 'JWT Auth เสร็จสมบูรณ์', time: '2 ชั่วโมงที่แล้ว', type: 'success', initials: '✓' },
    { message: 'Task "Report API" เกิน deadline', time: 'เมื่อวาน', type: 'warning', initials: '!' },
  ];
}
