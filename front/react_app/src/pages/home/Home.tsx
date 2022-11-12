import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CycleCard from "../../components/CycleCard";
import Layout from "../../components/layout/Layout";
import { CycleIfc } from "../../interfaces/cycle.interface";
import HomeHeader from "./HomeHeader";

const Home = () => {
  const [cycles, setCycles] = useState<CycleIfc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3001/cycles?userId=1");
      setCycles(response.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Layout>
        <HomeHeader></HomeHeader>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              style={{ fontSize: "50px" }}
            />
          </div>
        ) : (
          cycles.map((ele) => (
            <Link key={ele.id} to={`/${ele.id}`}>
              <CycleCard element={ele}></CycleCard>
            </Link>
          ))
        )}
      </Layout>
    </>
  );
};

export default Home;
