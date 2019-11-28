using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.MyProfiles
{
    public class MyProfiles : VISBaseEntity
    {

        public string Mode { get; set; }
        public Int64 UserId { get; set; }
        public string Employee_Name { get; set; }
        public string LineManagerName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string PhotographFileName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public  string Designation { get; set; }
        public string DepartmentName { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string PermenantAddress { get; set; }
        public string CommunicationAddress { get; set; }
        public string LandlineNumber { get; set; }
        public string MobileNumber { get; set; }
        public string BirthDate { get; set; }
        public string BloodGroup { get; set; }
        public string MaritalStatus { get; set; }
        public string EmplopyeeGrade { get; set; }

        ///<summary>
        ///Education Data
        /// </summary>
        public bool HighestEducation { get; set; }
        public string  ClassDegree { get; set; }
        public string  SchoolInstitute { get; set; }
        public string  Medium { get; set; }
        public Int64 PassingYear { get; set; }
        public string  BoardUniversity { get; set; }
        public string  Percentage { get; set; }





    }
    public static class MyProfilesConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_EmployeeMaster = "Employee_Master";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        /// 

        public const string const_Field_Mode = "Mode";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_Employee_Name = "Employee_Name";
        public const string const_Field_LineManagerName = "LineManagerName";
        public const string const_Field_FirstName = "FirstName";
        public const string const_Field_MiddleName = "MiddleName";
        public const string const_Field_LastName = " LastName";
        public const string const_Field_Gender = " Gender";
        public const string const_Field_PhotographFileName = "PhotographFileName ";
        public const string const_Field_CompanyName = "CompanyName ";
        public const string const_Field_Email = " Email";
        public const string cons_Filed_Designation = " Designation";
        public const string cons_Filed_DepartmentNam = " DepartmentName";
        public const string cons_Filed_FatherName = " FatherName";
        public const string cons_Filed_MotherName = " MotherName";
        public const string cons_Filed_PermenantAddress = " PermenantAddress";
        public const string cons_Filed_CommunicationAddress = "CommunicationAddress";
        public const string cons_Filed_MobileNumber = " MobileNumber";
        public const string cons_Filed_LandlineNumber = " LandlineNumber";
        public const string cons_Filed_BirthDate = "BirthDate ";
        public const string cons_Filed_BloodGroup = " BloodGroup";
        public const string cons_Filed_MaritalStatus = "MaritalStatus ";
        public const string cons_Filed_EmplopyeeGrade = "EmplopyeeGrade";

        ///<summary>
        ///EducationFiles
        /// </summary>
        public const string cons_Filed_HighestEducation = "HighestEducation";
        public const string cons_Filed_ClassDegree = "ClassDegree";
        public const string cons_Filed_SchoolInstitute = "SchoolInstitute";
        public const string cons_Filed_Medium = "Medium";
        public const string cons_Filed_PassingYear = "PassingYear";
        public const string cons_Filed_BoardUniversity = "BoardUniversity";
        public const string cons_Filed_Percentage = "Percentage"; 

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_procGetUserProfile = "procGetUserProfile";
        public const string const_procGetEmployeeList = "procGetEmployeeList";
    }

}



