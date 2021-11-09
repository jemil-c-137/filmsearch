import React from 'react';
import { useParams } from 'react-router';
const PersonPage = () => {
  const data = useParams();
  console.log(data)

  return <div>some person page</div>;
};

export default PersonPage;
