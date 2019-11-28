using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.VacancyRelated
{
    public class RatingType : VISBaseEntity
    {
        /// <summary>
        /// Lookuptype Entity Fields. 
        /// </summary>
        /// 
        public string TypeName { get; set; }

    }

    public static class RatingTypeConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_RatingType_Table = "RatingType";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_TypeName = "TypeName";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procRatingType_Add = "procRatingType_Add";
        public const string const_procRatingType_Update = "procRatingType_Update";
        public const string const_procRatingType_ActiveInActive = "procRatingType_ActiveInActive";
        public const string const_procRatingType_SelectAll = "procRatingType_SelectAll";
        public const string const_procRatingType_SelectById = "procRatingType_SelectById";

    }
}
