import React, { useEffect, useState } from "react";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";
import {
    Paper,
    Typography,
    Chip,
    Box,
    Container,
    useMediaQuery,
    useTheme
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchExp = async () => {
            try {
                const response = await fetch("/profile/experience.json");
                const data = await response.json();
                setExperiences(data.experiences);
            } catch (error) {
                console.error("Error loading missions:", error);
            }
        };
        fetchExp();
    }, []);

    return (
        <Container sx={{ my: { xs: 6, md: 14 } }}>
            <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                color={colors.primary}
            >
                Background & Achievements
            </Typography>

            <Typography
                variant={isMobile ? "body1" : "h5"}
                color={colors.textLight}
                textAlign="center"
                gutterBottom
            >
                where my skills met real-world challenges
            </Typography>

            <Timeline
                position={isMobile ? "right" : "alternate"}
                sx={{ my: 5, px: { xs: 0, md: 2 } }}
            >
                {experiences.map((exp, index) => (
                    <TimelineItem key={index}>
                        {!isMobile && (
                            <TimelineOppositeContent sx={{ pt: 2 }}>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color={colors.textLight}
                                >
                                    {exp.period}
                                </Typography>
                            </TimelineOppositeContent>
                        )}

                        <TimelineSeparator>
                            <TimelineDot sx={{ backgroundColor: colors.primary }}>
                                <WorkIcon fontSize="small" />
                            </TimelineDot>
                            {index < experiences.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>

                        <TimelineContent sx={{ pb: 4 }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                                    {isMobile && (
                                        <Typography
                                            variant="caption"
                                            fontWeight="bold"
                                            color={colors.textLight}
                                        >
                                            {exp.period}
                                        </Typography>
                                    )}

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent={isMobile ? "center" : "flex-start"}
                                        mt={1}
                                        mb={1}
                                    >
                                        <Box
                                            component="img"
                                            src={exp.logo}
                                            alt={exp.company}
                                            sx={{
                                                width: isMobile ? 80 : 100,
                                                height: isMobile ? 50 : 60,
                                                objectFit: "contain",
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        textAlign={isMobile ? "center" : "left"}
                                    >
                                        {exp.contract}
                                    </Typography>

                                    <Box mt={1}>
                                        {exp.missions.map((mission, i) => (
                                            <Typography
                                                key={i}
                                                variant="body2"
                                                sx={{ mb: 0.5 }}
                                            >
                                                • {mission}
                                            </Typography>
                                        ))}
                                    </Box>

                                    <Box
                                        mt={2}
                                        display="flex"
                                        flexWrap="wrap"
                                        gap={1}
                                        justifyContent={isMobile ? "center" : "flex-start"}
                                    >
                                        {exp.tools.map((tool, i) => (
                                            <Chip
                                                key={i}
                                                label={tool}
                                                size="small"
                                                sx={{ color: colors.primary }}
                                            />
                                        ))}
                                    </Box>
                                </Paper>
                            </motion.div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Container>
    );
};

export default ExperienceTimeline;
