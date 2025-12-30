import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Stack } from "@mui/material";
import { colors } from "../styles/colors";
import SocialCards from "../components/Social";
import TypeWriter from 'typewriter-effect';

const HomePage = () => {
    const [missions, setMissions] = useState([]);
    const [domains, setDomains] = useState([]);
    const [name, setName] = useState([]);
    const [profile, setProfile] = useState([]);
    const [currentMission, setCurrentMission] = useState(0);

    useEffect(() => {
        // Charger les missions depuis le JSON
        const fetchMissions = async () => {
            try {
                const response = await fetch("/profile/mission.json");
                const data = await response.json();
                setMissions(data.missions);
                setName(data.name);
                setProfile(data.profile);
                setDomains(data.domains);
            } catch (error) {
                console.error("Error loading missions:", error);
            }
        };
        fetchMissions();
    }, []);

    // Changer la mission toutes les 3 secondes
    useEffect(() => {
        if (missions.length === 0) return;

        const interval = setInterval(() => {
            setCurrentMission((prev) => (prev + 1) % missions.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [missions]);

    return (
        <Stack direction="row" sx={{display: 'flex', textAlign: 'center', justifyContent: "center", my: 20}}>
            <Container disableGutters sx={{ flexDirection: 'center',  width: "70%",mt:10, backgroundColor: colors.background }}>
                {/* Titre */}
                <Typography variant="h3" fontWeight="bold" color={colors.textLight} gutterBottom>
                    Hi, I'm <span style={{ color: colors.primary }}>{name}</span>,
                </Typography>
                <Typography variant="h4" color={colors.textLight} gutterBottom>
                    a passionate <span style={{ color: colors.secondary, fontWeight: "bold" }}>{profile}</span>.
                </Typography>

                <Typography variant="h5" fontWeight="bold" sx={{ color: colors.secondary }}>
                        <TypeWriter options={{
                            strings: missions,
                            autoStart: true,
                            loop: true
                        }} />
                    </Typography>
                <Typography variant="h5" color={colors.textLight} sx={{ mt: 3 }} gutterBottom>
                    
                    Let’s build something amazing together! <br/>
                    Let’s talk and discuss the details!
                </Typography>
                {/* Cercles des missions */}
                {/* <Box sx={{ mt: 5 }}>
                <Grid container spacing={5} justifyContent="center">
                    {domains.map((domain, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} >
                            <Box
                                sx={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: "50%",
                                    backgroundColor: colors.accent,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#fff",
                                    textAlign: "center",
                                    padding: 3,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-10px)",
                                        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                                    },
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {domain}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box> */}
                <SocialCards />
            </Container>
            <Box
                component="img"
                src="/images/selfie.png"
                alt="Image importée"
                sx={{ width: "30%",objectFit: "contain",mt:0, mb:2, mx:10}}
            />
        </Stack>

    );
};

export default HomePage;
