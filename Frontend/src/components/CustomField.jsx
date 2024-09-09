import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const CustomField = ({ label, type, ...props }) => { 


  return (
    <div className="block text-gray-700 mb-6">
      <Field
      type={type}
        {...props}
        className="mt-1 block w-full border-gray-300 focus:outline-none rounded-md shadow-sm"
        placeholder={label}
      />
      
      <ErrorMessage name={props.name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default CustomField;
