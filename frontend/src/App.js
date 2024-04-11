import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Views from './Views';

function App() {
  return (
    // <UserContext>
      <ChakraProvider>
        <Views/>
      </ChakraProvider>
    // </UserContext>
  );
}

export default App;
