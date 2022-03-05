import { Grid, Typography } from "@mui/material";

const SectionTitle = ({ title }) => {
  return (
    <Grid item md={12} xs={12}>
      <div>
        <Typography variant="body2" component="body2">
          {title}
        </Typography>
      </div>
    </Grid>
  );
};

export default SectionTitle;
