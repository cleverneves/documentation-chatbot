import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import type { Source } from "../types";

interface SourceReferencesProps {
  sources: Source[];
}

export function SourceReferences({ sources }: SourceReferencesProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 0 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
          <Typography variant="caption" color="text.secondary">
            Fontes utilizadas:
          </Typography>
          {sources.map((source, index) => (
            <Chip
              key={`${source.fileName}-${index}`}
              size="small"
              icon={<DescriptionIcon fontSize="small" />}
              label={source.fileName}
            />
          ))}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0 }}>
        <Stack spacing={1.5}>
          {sources.map((source, index) => (
            <Stack key={`${source.fileName}-detail-${index}`} spacing={0.5}>
              <Typography variant="subtitle2">{source.fileName}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {source.excerpt}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
