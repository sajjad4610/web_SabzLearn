import React from "react";
import {Helmet} from "react-helmet";
 

export default function Title({text}) {
  return (
    <div>
                <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{text}</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
            
        </div>
    </div>
  )
}
