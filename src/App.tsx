import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import DefaultLayout from './layouts';

function App() {
  return (
    <div className="App">
      <DefaultLayout>
        <RouterProvider router={router} />
      </DefaultLayout>
    </div>
  );
}

export default App;