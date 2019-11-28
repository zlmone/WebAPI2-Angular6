using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class EventCountDown : VISBaseEntity
    {
        /// <summary>
        /// EventCountDown Entity Fields. 
        /// </summary>
        /// 
        public string EventName { get; set; }
        public string CountDownText { get; set; }
        public string CountDownDate { get; set; }
        public string CountDownTime { get; set; }
        public DateTime CountDownDateTime { get; set; }
        public int NoOfDay { get; set; }
        public bool Active { get; set; }

    }

    public static class EventCountDownnConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_Employee_EventCountDown_Table = "EventCountDown";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_EventName = "EventName";
        public const string const_CountDownText = "CountDownText";
        public const string const_CountDownDateTime = "CountDownDateTime";
        public const string const_NoOfDay = "NoOfDay";
        public const string const_Active = "Active";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procEmployee_EventCountDown_Add = "procEventCountDown_Add";
        public const string const_procEmployee_EventCountDown_Update = "procEventCountDown_Update";
        public const string const_procEmployee_EventCountDown_ActiveInActive = "procEventCountDown_ActiveInActive";
        public const string const_procEmployee_EventCountDown_SelectAll = "procEventCountDown_SelectAll";
        public const string const_procEmployee_EventCountDown_SelectById = "procEventCountDown_SelectById";
        

    }
}
