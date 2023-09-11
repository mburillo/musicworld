const AdditionalService = ({ onCostAdd, onCostRemove }) => {

    const handleCheckboxChange = (e, service, cost) => {
        if (e.target.checked) {
            onCostAdd(service, cost);
        } else {
            onCostRemove(service);
        }
    };

    return (
        <div class="col-lg-12">
          <p class="pt-4 fw-bold pb-3">Additional Service</p>
          <div class="card p-3 mb-2">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <p class="fw-bold">Care + package</p> <small class="text-muted">Five years of additional care</small>
              </div>
              <div class="d-flex align-items-center">
                <p class="pe-3">10.00€</p>
                <div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="SwitchCheck" value="10" onChange={(e) => handleCheckboxChange(e, 'CarePackage', 10)} /> </div>
              </div>
            </div>
          </div>
          <div class="card p-3 mb-2">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <p class="fw-bold">Environment Friendly</p> <small class="text-muted">Add some tip for earth care</small>
              </div>
              <div class="d-flex align-items-center">
                <p class="pe-3">1.00€</p>
                <div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="SwitchCheck" value="2" onChange={(e) => handleCheckboxChange(e, 'GoldenGuard', 1)} /> </div>
              </div>
            </div>
          </div>
        </div>
    );
  };
  export default AdditionalService;