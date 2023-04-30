import React from 'react'

export default function SortCourses({courses , cousesFilter ,setSort}) {



    const alingInexpensiveHndler = (event) => {
        setSort((prev) => !prev);
        if (!cousesFilter.length) {
          courses.sort((a, b) => a.cost - b.cost);
        } else {
          cousesFilter.sort((a, b) => a.cost - b.cost);
        }
      };
    
      const alingExpensiveHndler = (event) => {
        setSort((prev) => !prev);
    
        if (!cousesFilter.length) {
          courses.sort((a, b) => a.cost - b.cost).reverse();
        } else {
          cousesFilter.sort((a, b) => a.cost - b.cost).reverse();
        }
      };
      const alingBestSellerHndler = (event) => {
        setSort((prev) => !prev);
    
        if (!cousesFilter.length) {
          courses.sort(
            (a, b) => a.salesnumber - b.salesnumber
          ).reverse();
        } else {
          cousesFilter.sort((a, b) => a.salesnumber - b.salesnumber).reverse();
        }
      };
      const alingDiscountHndler = (event) => {
        setSort((prev) => !prev);
        if (!cousesFilter.length) {
          courses.sort((a, b) => a.discount - b.discount).reverse();
        } else {
          cousesFilter.sort((a, b) => a.discount - b.discount).reverse();
        }
      };
  return (
    <div className="row m-3 mt-4 mb-0 bg-info p-2 justify-content-center justify-content-sm-start  rounded shadow-lg  ">
    <div className="col-auto">
      <button
        className="btn border-0  btn-outline-light fs-4"
        onClick={alingInexpensiveHndler}
      >
        ارزان ترین
      </button>
    </div>
    <div className="col-auto">
      <button
        className="btn btn-outline-light border-0  fs-4"
        onClick={alingExpensiveHndler}
      >
        گران ترین
      </button>
    </div>
    <div className="col-auto">
      <button
        className="btn border-0  btn-outline-light fs-4"
        onClick={alingBestSellerHndler}
      >
        پر فروش ترین
      </button>
    </div>
    <div className="col-auto">
      <button
        className="btn border-0  btn-outline-light fs-4"
        onClick={alingDiscountHndler}
      >
        بیشترین تخفیف
      </button>
    </div>
  </div>
  )
}
