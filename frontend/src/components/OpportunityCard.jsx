const skillMatch = async (req, res) => {
  try {
    const { userSkills, opportunitySkills } = req.body;

    if (!userSkills || !opportunitySkills) {
      return res.status(400).json({
        success: false,
        message: "Both skill lists are required",
      });
    }

    const matchedSkills = userSkills.filter((skill) =>
      opportunitySkills.includes(skill)
    );

    const matchPercentage = Math.round(
      (matchedSkills.length / opportunitySkills.length) * 100
    );

    res.status(200).json({
      success: true,
      matchedSkills,
      matchPercentage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Skill matching failed",
    });
  }
};