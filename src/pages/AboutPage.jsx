import React, { useEffect, useState } from "react";
import { Container, Stack, Typography, Box } from "@mui/material";
import { colors } from "../styles/colors";
import Carousel from "../components/Carousel360";

const AboutPage = () => {
    const [intro, setAboutIntro] = useState([]);
    const [middle, setAboutMiddle] = useState([]);
    const [end, setAboutEnd] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // Charger les missions depuis le JSON
        const fetchAbout = async () => {
            try {
                const response = await fetch("/profile/about.json");
                const data = await response.json();
                setAboutIntro(data.intro);
                setAboutMiddle(data.middle);
                setAboutEnd(data.end);
                const pics = await fetch("/profile/images.json");
                const pics_data = await pics.json();
                setPhotos(pics_data);
            } catch (error) {
                console.error("Error loading missions:", error);
            }
        };
        fetchAbout();
    }, []);

    return (
        // <Stack direction="row" sx={{ mt: 20, textAlign: "start", justifyContent: "center", }}>
        <Box sx={{mt:14,  textAlign: 'center', justifyContent: 'center',minHeight: "100vh",}}>
             <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                color={colors.primary}
            >
                Beyond the Code: People, Nature, and Traditions
            </Typography>
            <Container disableGutters sx={{ mx: 10, textAlign: "center", justifyContent: "center",  backgroundColor: colors.background, }}>
                <Typography
                    variant="body1" color={colors.textLight}
                    sx={{ textIndent: "2em", marginBottom: "1em" }} // retrait et marge
                >
                    {intro}
                </Typography>
                <Typography
                    variant="body1" color={colors.textLight}
                    sx={{ textIndent: "2em", marginBottom: "1em" }} // retrait et marge
                >
                    {middle}
                </Typography>
                <Typography
                    variant="body1" color={colors.textLight}
                    sx={{ textIndent: "2em", marginBottom: "1em" }} // retrait et marge
                >
                    {end}
                </Typography>
            </Container>
            <Container sx={{mx:10}}>
                <Carousel />
            </Container>
     </Box>
    );
};

export default AboutPage;
