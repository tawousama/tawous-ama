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
import { Paper, Typography, Chip, Box, Container } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { motion } from "framer-motion";
import { colors } from "../styles/colors";

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState([]);

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
        <Container sx={{ my: 14 }}>
             <Typography
                            variant="h4"
                            fontWeight="bold"
                            textAlign="center"
                            gutterBottom
                            color={colors.primary}
                        >
                            My Academic and Professional Journey
                        </Typography>
            <Typography variant="h5" color={colors.textLight} sx={{textAlign: 'center'}} gutterBottom>
                Scroll down to explore it
            </Typography>
            <Timeline position="alternate" sx={{ my: 5 }}>
                {experiences.map((exp, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{ alignItems: 'center', pt: 2 }}>
                            <Typography
                                variant="body2"
                                sx={{ color: colors.textLight, fontWeight: 'bold', flexDirection: 'center' }}
                            >
                                {exp.period}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot sx={{ backgroundColor: colors.primary }}>
                                <WorkIcon />
                            </TimelineDot>
                            {index < experiences.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            {/* Motion wrapper pour animation */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1} mb={1}>
                                        <Box
                                            component="img"
                                            src={exp.logo}
                                            alt={exp.company}
                                            sx={{ width: 100, height: 60, objectFit: "contain" }}
                                        />
                                    </Box>
                                    <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: 'start' }}>
                                        {exp.contract}
                                    </Typography>
                                    <Box mt={1}>
                                        {exp.missions.map((mission, i) => (
                                            <Typography key={i} variant="body2" sx={{ mb: 0.5, textAlign: 'start' }}>
                                                • {mission}
                                            </Typography>
                                        ))}
                                    </Box>
                                    <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                        {exp.tools.map((tool, i) => (
                                            <Chip key={i} label={tool} size="small" sx={{ color: colors.primary }} />
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
