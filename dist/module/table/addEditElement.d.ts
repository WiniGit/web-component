import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface AddEditElementFormProps {
    tbName: string;
    title?: string;
    activeColumns: {
        [p: string]: any;
    }[];
    id?: string;
    onSuccess?: Function;
    expandForm?: (methods: UseFormReturn) => ReactNode;
}
declare const AddEditElementForm: import('react').ForwardRefExoticComponent<AddEditElementFormProps & import('react').RefAttributes<unknown>>;
export default AddEditElementForm;
//# sourceMappingURL=addEditElement.d.ts.map