import React, { useState } from "react";
import DataTable from "../../../Components/DataTable/DataTable";
import { columns, selectBoxSearch } from "../../../Schema/schemaTabel/schemaComment/schemaComment";
import SectionHeader from '../../../Components/SectionHeader/SectionHeader'

export default function AdminComment() {
  const[refresh,setRefresh]=useState(false)
  const refreshTrashHandler=()=>{
    setRefresh(prev=>!prev)
  }
  return (
    <div>
    <div className="mt-5">
    <SectionHeader title={'کامنت ها'}/>
    
</div>
<div className="mt-5">
      <DataTable
        refreshTrashHandler={refreshTrashHandler}
        // refreshByTabs={refreshByTabs}
        refreshTrash={refresh}
        // refreshByValidform={validForm}
        columns={[...columns]}
        selectBox={[...selectBoxSearch]}
        apiData="http://localhost:4000/v1/course/getallcoursecomment"
        apiRemove={"http://localhost:4000/v1/course/removecomment"}
        methodRemove={"PUT"}
        messageTrash="آیا از حذف این کامنت مطمئن هستید؟"
        type="confirmComment"
      ></DataTable>
    
    </div>
    </div>
  );
}
