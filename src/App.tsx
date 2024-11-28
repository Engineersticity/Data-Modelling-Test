import { generateClient } from "aws-amplify/api";
import CustomerCreateForm from "./ui-components/CustomerCreateForm";
import { CustomerCreateFormInputValues } from './ui-components/CustomerCreateForm';
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>()

// Async function to generate customer name
const generateCustomerName = (customerId: string): string => {
  const prefix = customerId.startsWith('B') ? 'Business-' : 
                customerId.startsWith('C') ? 'Corporate-' : 
                'Customer-';
  
  return `${prefix}${customerId}`;
};

function App() {
  return (
    <main>
      <h1>Remove Amplify generated fields from UI</h1>

    
      <button onClick={async () => {
        const response = await client.queries.myFunction({ name: 'John' });
        console.log(response);
      }}>Test functions</button>


      
      <div>
        <CustomerCreateForm
          overrides={{
            name: {
              display: 'none'
            },
            engagementStage: {
              display: 'none'
            }
          }}
          onSubmit={(fields: CustomerCreateFormInputValues): CustomerCreateFormInputValues => {
            const generatedName = generateCustomerName(fields.customerId || "B123");
            return {
              ...fields,
              name: generatedName,
              engagementStage: 'PROSPECT'
            };
          }}
          onSuccess={(fields) => {
            console.log('Form submitted successfully with fields:', fields);
          }}
          onError={(fields, errorMessage) => {
            console.log('Form submission error with fields:', fields);
            console.error('Form submission error:', errorMessage);
          }}
        />
      </div>
    </main>
  );
}

export default App;