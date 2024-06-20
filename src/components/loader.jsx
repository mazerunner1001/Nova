import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Spinner
        animation="border"
        role="status"
        style={{ width: '100px', height: '100px', color: 'white' }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
