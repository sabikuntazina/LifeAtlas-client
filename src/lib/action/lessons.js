const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

/* ---------------------------------------
   GET ALL LESSONS (Admin / Debug)
----------------------------------------*/
export const getAllLessons = async () => {
  const res = await fetch(`${BASE_URL}/lessons/all`);
  return res.json();
};

/* ---------------------------------------
   GET PUBLIC LESSONS (Home / Public Page)
----------------------------------------*/
export const getPublicLessons = async () => {
  const res = await fetch(`${BASE_URL}/lessons/public`);
  return res.json();
};

/* ---------------------------------------
   GET MY LESSONS (Dashboard Table)
----------------------------------------*/
export const getMyLessons = async (userId) => {
  const res = await fetch(`${BASE_URL}/lessons/my/${userId}`);
  return res.json();
};

/* ---------------------------------------
   CREATE LESSON
----------------------------------------*/
export const createLesson = async (data) => {
  const res = await fetch(`${BASE_URL}/lessons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

/* ---------------------------------------
   UPDATE VISIBILITY (public/private)
----------------------------------------*/
export const updateVisibility = async (id, visibility) => {
  const res = await fetch(`${BASE_URL}/lessons/visibility/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ visibility }),
  });

  return res.json();
};

/* ---------------------------------------
   UPDATE ACCESS (free/premium)
----------------------------------------*/
export const updateAccess = async (id, access, userPlan) => {
  const res = await fetch(`${BASE_URL}/lessons/access/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access, userPlan }),
  });

  return res.json();
};

/* ---------------------------------------
   UPDATE STATS (reaction / save)
----------------------------------------*/
export const updateLessonStats = async (id, type) => {
  const res = await fetch(`${BASE_URL}/lessons/stats/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  });

  return res.json();
};

/* ---------------------------------------
   DELETE LESSON
----------------------------------------*/
export const deleteLesson = async (id) => {
  const res = await fetch(`${BASE_URL}/lessons/${id}`, {
    method: "DELETE",
  });

  return res.json();
};


//update lesson
export const updateLesson = async (req, res) => {
  try {
    const id = req.params.id;

    const currentUserId = req.user.id;

    const lesson = await lessonsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    if (lesson.userId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await lessonsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          tone: req.body.tone,
          image: req.body.image,
          access: req.body.access,
          updatedAt: new Date(),
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
