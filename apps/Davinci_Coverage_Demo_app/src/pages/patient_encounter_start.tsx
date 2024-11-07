import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/page";
import { PATIENT_DETAILS } from "../constants/data";
import { useDispatch } from "react-redux";
import { selectPatient } from "../redux/patientSlice";
import { useNavigate } from "react-router-dom";

function PatientEncounter() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const patients: { [key: string]: string } = {};

  PATIENT_DETAILS.forEach((patient) => {
    const fullName = patient.name[0].given[0] + " " + patient.name[0].family;
    patients[patient.id] = fullName;
  });

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPatient(event.target.value);
  }

  const handleBtnClick = () => {
    dispatch(selectPatient(selectedPatient));
    navigate("dashboard");
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <img
          src="/encounter_start.png"
          alt="Healthcare"
          style={{ width: SCREEN_WIDTH / 2 }}
        />
      </div>
      <div
        style={{
          marginLeft: SCREEN_WIDTH * 0.06,
          marginTop: SCREEN_HEIGHT * 0.12,
        }}
      >
        <div style={{ marginBottom: 0, fontSize: 48, fontWeight: 600 }}>
          Welcome to Your
        </div>
        <div style={{ marginTop: -10, fontSize: 48, fontWeight: 600 }}>
          Healthcare HQ
        </div>
        <div style={{ height: SCREEN_HEIGHT * 0.065 }} />
        <Box
          sx={{
            width: SCREEN_WIDTH * 0.25,
            minWidth: 100,
            marginLeft: SCREEN_WIDTH * 0.002,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedPatient}
              label="Patient"
              onChange={handleChange}
            >
              {Object.entries(patients).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          style={{
            marginLeft: SCREEN_WIDTH * 0.16,
            marginTop: SCREEN_HEIGHT * 0.03,
            borderRadius: "50px",
          }}
          disabled={selectedPatient === ""}
          onClick={handleBtnClick}
        >
          Treat Patient
        </Button>
      </div>
    </div>
  );
}

export default PatientEncounter;
