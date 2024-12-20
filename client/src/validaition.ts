import { z } from 'zod';

export const StatusSchema = z.enum(['approved', 'pending', 'rejected']); //Pending, Approved, Rejected
export const RoleSchema = z.enum(['requester', 'validator']); //Requester, Validator

export type Status = z.infer<typeof StatusSchema>;
export type Role = z.infer<typeof RoleSchema>;

export const UserSchema = z.object({
  name: z.string().max(100),
  role: RoleSchema
}).strict();

export type UserCreataion = z.infer<typeof UserSchema>;

export const VacationSchema = z.object({
  requester_id: z.number(),
  validator_id: z.number(),
  start_date: z.string().date().or(z.date()),
  end_date: z.string().date().or(z.date()),
  reason: z.string().max(255).optional().or(z.null().optional()),
  status: StatusSchema,
  comments: z.string().max(1000).optional().or(z.null().optional()),
}).strict();

export type VacationCreation = z.infer<typeof VacationSchema>;

export const VacationApproveSchema = z.object({
  status: StatusSchema,
  comments: z.string().max(1000).optional().or(z.null().optional()),
});

export type VacationUpdate = z.infer<typeof VacationApproveSchema>;


export function validateUserCreate(userData: UserCreataion) {
  UserSchema.parse(userData);
};

export function validateVacationCreation(vacationData: VacationCreation) {
  VacationSchema.parse(vacationData);
};

export function validateVacationApprove(vacationData: VacationUpdate) {
  VacationApproveSchema.parse(vacationData);
};
