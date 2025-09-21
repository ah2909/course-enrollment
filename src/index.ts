import express from 'express';
import courseRoutes from './routes/course';
import studentRoutes from './routes/student';

const PORT: number = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

app.use("/courses", courseRoutes);
app.use(studentRoutes);

// error handler fallback
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) {
    return _next(err);
  }

  res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
    success: false,
    error_message: err.message || "Internal Server Error",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;