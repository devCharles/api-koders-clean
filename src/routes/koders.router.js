const express = require("express");
const koders = require("../usecases/koders.usecase");

const router = express.Router();

router.get("/", async (request, response) => {
  const allKoders = await koders.getAll();

  response.json({
    message: "Koders list",
    data: {
      koders: allKoders,
    },
  });
});

router.post("/", async (request, response) => {
  try {
    const koderData = request.body;
    const newKoder = await koders.create(koderData);

    response.status(201);
    response.json({
      message: "Koder created",
      data: {
        koder: newKoder,
      },
    });
  } catch (error) {
    response.status(500);
    response.json({
      message: "something went wrong",
      error: error,
    });
  }
});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  const koder = await koders.getById(id);

  response.json({
    message: `Koder ${koder.firstName}`,
    data: { koder },
  });
});

module.exports = router;
