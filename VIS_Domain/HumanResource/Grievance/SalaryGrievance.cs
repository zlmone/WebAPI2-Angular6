using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.Grievance
{
    public class SalaryGrievance : VISBaseEntity
    {
        public Int64 Employee_Id { get; set; }
        public string Employee_Name  { get; set; }
        public DateTime Deduction_Date  { get; set; }
        public string Grievance_Remarks  { get; set; }
        public string PaycutAmount  { get; set; }
        public string GrievanceType_PE  { get; set; }
        public string GrievanceType_PH  { get; set; }
        public Int64 PE_Status  { get; set; }
        public string PE_Remarks  { get; set; }
        public Int64 PE_UpdatedBy  { get; set; }
        public DateTime PE_UpdatedDate { get; set; }
        public Int64 PH_Status  { get; set; }
        public string PH_Remarks  { get; set; }
        public Int64 PH_UpdatedBy  { get; set; }
        public DateTime PH_UpdatedDate { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime UpdateDateTime  { get; set; }
        public Boolean Active  { get; set; }
        public Int64 verified_By  { get; set; }
    }

    public class FillGrievance
    {
        public Int64 Id { get; set; }
        public Int64 Employee_Id { get; set; }
        public string Employee_Name { get; set; }
        public DateTime Deduction_Date { get; set; }
        public string Grievance_Remarks { get; set; }
        public string PaycutAmount { get; set; }
        public string GrievanceType_PE { get; set; }
        public string GrievanceType_PH { get; set; }
        public Int64 PE_Status { get; set; }
        public string PE_Remarks { get; set; }
        public Int64 PE_UpdatedBy { get; set; }
        public DateTime PE_UpdatedDate { get; set; }
        public Int64 PH_Status { get; set; }
        public string PH_Remarks { get; set; }
        public Int64 PH_UpdatedBy { get; set; }
        public DateTime PH_UpdatedDate { get; set; }
        public Int64 CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public Int64 UpdatedBy { get; set; }
        public DateTime UpdateDateTime { get; set; }
        public Boolean Active { get; set; }
        public Int64 verified_By { get; set; }
    }

    public class FillGrievanceDate
    {
        public Int64 Id { get; set; }
        public Int64 EmployeeId { get; set; }
        public string Deduction_Date { get; set; }
        public DateTime CreatedOn { get; set; }
        public string PayrollCut { get; set; }
        public string PayrollRemarks { get; set; }
        public Int64 LineManagerId { get; set; }
        public string LineManagerName { get; set; }
    }

    public class UpdateGrievance
    {
        public Int64 Id { get; set; }
        public string Grievance_Remarks { get; set; }
    }

    public static class SalaryGrievanceConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_Table_SalaryGrievance = "SalaryGrievance";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>

        public const string const_Field_Id = "Id";
        public const string const_Field_EmployeeId = "EmployeeId";
        public const string const_Field_mode = "mode";
        public const string const_Field_empId = "empId";
        public const string const_Field_forWhichDate = "forWhichDate";
        public const string const_Field_Date = "Date";

        public const string const_Field_DeductionDate = "DeductionDate";
        public const string const_Field_PC_AMT = "PC_AMT";
        public const string const_Field_Grievance_Remark = "Grievance_Remark";
        public const string const_Field_UpdatedBy = "UpdatedBy";
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>

        public const string const_ProcSalaryGrievanceProcessing_SelectAll = "ProcSalaryGrievanceProcessing";
        public const string const_Proc_PA_GetGrievanceDate = "Proc_PA_GetGrievanceDate";
        public const string const_Proc_ReportPerEmp_Grievance = "Proc_ReportPerEmp_Grievance";
        public const string const_Proc_GetAttendancePerEmp_Grievance = "Proc_GetAttendancePerEmp_Grievance";
        public const string const_Proc_InsertupdateGrievance = "Proc_InsertupdateGrievance";
    }
}
