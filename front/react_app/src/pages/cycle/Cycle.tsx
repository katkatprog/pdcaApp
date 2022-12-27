import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { CycleIfc } from "../../utils/cycle.interface";

const Cycle = () => {
  const params = useParams<{ cycleId: string }>();
  const [cycle, setCycle] = useState<CycleIfc>({
    id: 0,
    name: "",
    about: "",
    goal: "",
    userId: 0,
    favorite: false,
    watchFromAnyone: false,
    erased: false,
    currentRound: 0,
    suspend: false,
  });

  useEffect(() => {
    (async () => {
      const data = await (
        await axios.get(`/api/cycles/${params.cycleId}/${1}`)
      ).data;
      setCycle(data);
    })();
  }, []);
  return (
    <>
      <Layout>{cycle.name}</Layout>
    </>
  );
};

export default Cycle;
