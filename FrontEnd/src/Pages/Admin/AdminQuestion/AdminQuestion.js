
import React, { useState } from "react";
import DataTable from "../../../Components/DataTable/DataTable";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import { columns, selectBoxSearch } from "../../../Schema/schemaTabel/schemaQuestion/schemaQuestion";


export default function AdminQuestion() {
  const[refresh,setRefresh]=useState(false)
  const refreshTrashHandler=()=>{
    setRefresh(prev=>!prev)
  }
  return (
    <div>
<div className="mt-5">
        <SectionHeader title={'پرسش و پاسخ'}/>
    
</div>
<div className="mt-5">

      <DataTable
        refreshTrashHandler={refreshTrashHandler}
        // refreshByTabs={refreshByTabs}
        refreshTrash={refresh}
        // refreshByValidform={validForm}
        columns={[...columns]}
        selectBox={[...selectBoxSearch]}
        apiData="http://localhost:4000/v1/course/getallcoursequestion"
        apiRemove={"http://localhost:4000/v1/course/removequestion"}
        methodRemove={"PUT"}
        messageTrash="آیا از حذف این کامنت مطمئن هستید؟"
        type="confirmQuestion"
      />
</div>
    </div>
  );
}