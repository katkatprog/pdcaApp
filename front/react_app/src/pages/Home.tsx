import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { CycleIfc } from "../interfaces/cycle.interface";

const Home = () => {
  const [cycles, setCycles] = useState<CycleIfc[]>([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3001/cycles?userId=1");
      setCycles(response.data);
    })();
  }, []);

  return (
    <>
      <Layout>
        <ul>
          {cycles.map((ele) => (
            <li key={ele.id}>{ele.name}</li>
          ))}
        </ul>
      </Layout>
    </>
  );
};

export default Home;
