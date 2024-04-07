import { BsCheckCircle } from "react-icons/bs";
import { useState } from "react";

const GptOutput = ( {requestInfo } ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseGenerated, setIsResponseGenerated] = useState(false);

  setIsLoading(true);
  setIsResponseGenerated(false);

  return (
    <div>
      <div className="d-flex">
        <h3>output:</h3>
        {isLoading && (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {isResponseGenerated && !isLoading && (
          <div className="text-success">
            <BsCheckCircle size={20} />
            <span className="ml-2">Response Generated</span>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img
              src="/path/to/your/image.jpg"
              alt="Product"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Product Name</h5>
              <p className="card-text">Product Description</p>
              <a href="#" className="btn btn-primary">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptOutput; 
