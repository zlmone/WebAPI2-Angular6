using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository;

namespace VIS_App.Controllers.Masters.CompanyRelated
{
    public class LeaveTypeAPIController : BaseAPIController
    {
        VISIBaseRepository<LeaveType> LeaveTypeRepository;
        List<LeaveType> EntityList = new List<LeaveType>();

        public LeaveTypeAPIController(VISIBaseRepository<LeaveType> _LeaveTypeRepositiory)
        {
            LeaveTypeRepository = _LeaveTypeRepositiory;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(LeaveTypeRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]LeaveType value)
        {
            return ToJson(LeaveTypeRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]LeaveType value)
        {
            return ToJson(LeaveTypeRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(LeaveTypeRepository.DeleteEntity(Id));
        }
    }
}
