const express = require("express");
const practices = require("../usecases/practices.usecase");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allPractices = await practices.getAll();

    response.json({
      message: "Practices list",
      data: {
        practices: allPractices,
      },
    });
  } catch (error) {
    response.status(500);
    response.json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const practiceData = request.body;
    const newKoder = await practices.create(practiceData);

    response.status(201);
    response.json({
      message: "Koder created",
      data: {
        practice: newKoder,
      },
    });
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    response.status(status);
    response.json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const practice = await practices.getById(id);

    response.json({
      message: `Koder ${practice.id}`,
      data: { practice },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const practiceDeleted = await practices.deleteById(id);

    response.json({
      message: "Koder deleted",
      data: {
        practice: practiceDeleted,
      },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const data = request.body;

    const practiceUpdated = await practices.updateById(id, data);

    response.json({
      message: "practice updated",
      data: {
        practice: practiceUpdated,
      },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;
