using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Repository
{
    public interface VISIBaseRepository<T> : IDisposable 
    {
        Int32 intAffectedRecords { get; set; }
        IEnumerable<T> GetEntityList();
        T GetEntityByID(Int64 entityId);
        string AddEntity(T entityObject);
        string DeleteEntity(Int64 Id);
        string UpdateEntity(T entityObject);

    }
}
