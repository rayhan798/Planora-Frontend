"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// get all events (for public page)
export const getEvents = async () => {
  try {
    const response = await httpClient.get("/events");

    return response.data;
  } catch (err: any) {

    console.error(
      "--- BACKEND ERROR DETAIL ---",
      err?.response?.data || err.message,
    );
    return {
      success: false,
      data: [],
      message: err?.response?.data?.message || "Failed to fetch events",
    };
  }
};

// get all events (for public page)
export const getMyEvents = async () => {
  try {
    const response = await httpClient.get("/events/my-events");

    return response.data || response;
  } catch (err: any) {
    console.error(
      "--- Error Fetching My Events ---",
      err?.response?.data || err.message,
    );
    return {
      success: false,
      data: [],
      message: "Failed to fetch your events",
    };
  }
};

// get all public events for slider
export const getPublicEvents = async () => {
  try {
    
    const response = await httpClient.get("/events/public-slider");

    const allEvents = response.data?.data || response.data || [];

    const publicEvents = allEvents
      .filter((ev: any) => ev.isPublic === true)
      .slice(0, 9);

    return publicEvents;
  } catch (err: any) {
    console.error(
      "--- Error Fetching Public Events ---",
      err?.response?.data || err.message,
    );
    return [];
  }
};

// create new event
export const createEvent = async (formData: FormData) => {
  console.log("--- SERVER ACTION START ---");

  const backendPayload = new FormData();

  // ---------------- Data Fixes ----------------
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const venue = formData.get("venue") as string; // Key must match backend
  const fee = formData.get("fee") as string;
  const isPublic = formData.get("isPublic") as string;

  backendPayload.append("title", title || "");
  backendPayload.append("description", description || "");
  backendPayload.append("date", date || new Date().toISOString());
  backendPayload.append("time", time || "00:00");
  backendPayload.append("venue", venue || "");
  backendPayload.append("fee", String(Number(fee) || 0));
  backendPayload.append("isPublic", isPublic || "false");

  // ---------------- Image Handling ----------------
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    console.log(" Image found, appending:", imageFile.name);
    backendPayload.append("image", imageFile); // Must match multer single("image")
  }

  try {
    const response = await httpClient.post("/events", backendPayload, {
      headers: { "Content-Type": "multipart/form-data" }, // ensure multipart
    });
    const result = response.data;

    console.log("✅ Backend Success Response:", result.data || result);

    // ---------------- Revalidate Pages ----------------
    revalidatePath("/dashboard/my-events");
    revalidatePath("/events");

    return {
      success: true,
      data: result.data || result,
      message: result.message || "Event created successfully!",
    };
  } catch (err: any) {
    const errorData = err?.response?.data || err;
    console.error(
      "❌ Backend Error Details:",
      JSON.stringify(errorData, null, 2),
    );

    return {
      success: false,
      message: errorData?.message || "Failed to create event",
    };
  }
};

// update event
export const updateEvent = async (id: string, eventData: any) => {
  try {
   
    const isoDate = eventData.date
      ? new Date(eventData.date).toISOString()
      : undefined;

    const formattedData = {
      title: eventData.title,
      description: eventData.description,
      date: isoDate, 
      time: eventData.time,
      fee: Number(eventData.fee) || 0,
      venue: eventData.location,
      isPublic: eventData.privacy === "public",
    };

    console.log("Updating Event with ISO Date:", formattedData.date);

    const response = await httpClient.put(`/events/${id}`, formattedData);

    revalidatePath("/dashboard/my-events");
    revalidatePath("/events");

    return { success: true, data: response };
  } catch (err: any) {
    const errorData = err?.response?.data || err;
    console.error("❌ Prisma Validation Failed:", errorData);

    return {
      success: false,
      message: errorData?.message || "Invalid Date Format",
    };
  }
};

// delete event
export const deleteEventAction = async (id: string) => {
  if (!id) return { success: false, message: "Event ID is required" };

  try {
   
    const response = await httpClient.delete(`/events/${id}`);

    revalidatePath("/dashboard/my-events");
    revalidatePath("/events"); 

    return {
      success: true,
      data: response,
      message: "Event deleted successfully",
    };
  } catch (err: any) {
  
    const errorData = err?.response?.data || err;
    console.error(`--- DEBUG: DELETE /events/${id} Failed ---`, errorData);

    return {
      success: false,
      message: errorData?.message || "Failed to delete the event from server",
    };
  }
};


// get event by id
export const getEventById = async (id: string) => {
  if (!id) return { success: false, message: "Event ID is required" };
  try {
    const response = await httpClient.get(`/events/${id}`);
    return {
      success: true,
      data: response?.data || response,
    };
  } catch (err: any) {
    const errorData = err?.response?.data || err;
    console.error(`--- DEBUG: GET /events/${id} Failed ---`, errorData);
    return {
      success: false,
      message: errorData?.message || "Event not found",
    };
  }
};








// get pending participants for an event (for host)
export const getPendingParticipants = async (eventId: string) => {
  try {
    const response = await httpClient.get(
      `/participations/event/${eventId}/pending`,
    );
    return response.data || [];
  } catch (error) {
    console.error("Fetch Pending Error:", error);
    return [];
  }
};


// update participant status (approve/reject)
export const updateParticipantStatus = async (
  eventId: string,
  userId: string,
  status: string,
) => {
  try {
    const response = await httpClient.patch(
      `/participations/${eventId}/status`,
      {
        userId,
        status, // 'APPROVED' or 'REJECTED'
      },
    );

    revalidatePath("/dashboard/my-events");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update status",
    };
  }
};







// get my invitations
export const getInvitations = async () => {
  try {
    const response = await httpClient.get("/invitations/me");

   
    console.log("--- DEBUG: Backend Raw Response ---", response.data);

    const data = response.data;

    if (data && data.success && Array.isArray(data.data)) {
      return data.data;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (err: any) {
    console.error(
      "--- DEBUG: GET /invitations/me Failed ---",
      err?.response?.data || err.message,
    );
    return [];
  }
};

// respond to invitation (accept/decline)
export const respondToInvitationAction = async (
  id: number | string,
  status: "ACCEPTED" | "DECLINED",
) => {
  try {
    // PATCH /invitations/:id
    const response = await httpClient.patch(`/invitations/${id}`, { status });

    return {
      success: true,
      data: response.data,
    };
  } catch (err: any) {
    console.error(
      "--- DEBUG: PATCH /invitations/:id Failed ---",
      err?.response?.data || err.message,
    );
    return {
      success: false,
      message:
        err?.response?.data?.message || "Failed to respond to invitation",
    };
  }
};


// send invitation to a user for an event (host action)
export const sendInvitationAction = async (payload: {
  eventId: number;
  receiverId: number;
}) => {
  try {
    //  POST /invitations/
    const response = await httpClient.post("/invitations", payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (err: any) {
    console.error(
      "--- DEBUG: POST /invitations Failed ---",
      err?.response?.data || err.message,
    );
    return {
      success: false,
      message: err?.response?.data?.message || "Failed to send invitation",
    };
  }
};







//  GET EVENT REVIEWS
export const getReviews = async (eventId?: string) => {
  if (!eventId) {
    return httpClient.get(`/reviews/my`); // ✅ dashboard
  }

  return httpClient.get(`/reviews/event/${eventId}`); // ✅ event page
};

//  CREATE REVIEW
export const createReview = async (payload: {
  eventId: number;
  rating: number;
  comment: string;
}) => {
  const res = await httpClient.post("/reviews", payload);
  return res.data;
};


//  UPDATE REVIEW
export const updateReviewAction = async (
  id: number,
  payload: { rating: number; comment: string },
) => {
  const res = await httpClient.patch(`/reviews/${id}`, payload);
  return res.data;
};


//  DELETE REVIEW
export const deleteReviewAction = async (id: number) => {
  const res = await httpClient.delete(`/reviews/${id}`);
  return res.data;
};








// get my profile
export const getMyProfile = async () => {
  try {
    const response = await httpClient.get("/users/profile");

    return response.data?.data || response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Failed to fetch profile data";
    console.error("Fetch Profile Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

// get all users (for admin)
export const getAllUsers = async () => {
  try {
    const response = await httpClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// delete user (admin action)
export const deleteUser = async (id: number) => {
  try {
    const response = await httpClient.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

// update profile
export const updateProfileAction = async (payload: {
  name: string;
  bio: string;
  image?: string;
}) => {
  try {
    const response = await httpClient.patch("/users/update-profile", payload);

    return {
      success: true,
      data: response.data?.data || response.data,
      message: response.data?.message || "Profile updated successfully!",
    };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Could not update profile";
    console.error("Update Action Error:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// update password
export const updatePasswordAction = async (payload: {
  oldPassword?: string;
  newPassword: string;
}) => {
  try {
    const response = await httpClient.patch("/users/update-password", {
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
    });

    return {
      success: true,
      message: response.data?.message || "Password updated successfully!",
    };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Failed to update password";
    console.error("Password Update Error:", errorMessage);

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// logout action
export async function logoutAction() {
  const cookieStore = await cookies();

  const options = {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  };

  cookieStore.set("accessToken", "", options);
  cookieStore.set("token", "", options);

  cookieStore.delete("accessToken");
  cookieStore.delete("token");

  redirect("/login");
}






// get user notifications
export const getNotification = async () => {
  const cookieStore =await cookies();
  const token = cookieStore.get("accessToken")?.value; 
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/notifications`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `accessToken=${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};

// update user notification settings
export const updateNotificationAction = async (payload: {
  type: string;
  enabled: boolean;
}) => {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("accessToken")?.value;

    const response = await httpClient.patch("/users/notifications", payload, {
      headers: {
        Cookie: `accessToken=${token}`, 
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Failed to update notification settings";
    
    console.error("Update Notification Error:", {
      status: error?.response?.status,
      data: error?.response?.data,
    });

   
    return {
      success: false,
      message: errorMessage,
    };
  }
};





// contact messages actions
export const getAllContactMessages = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value;

    console.log("🛠️ Server Action: Fetching with token:", token ? "Exists" : "Not Found");
    const response = await httpClient.get("/contact/all-messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ API Response raw:", response);
    return response; 

  } catch (error: any) {
    console.error("❌ Error in getAllContactMessages action:", error?.response?.data || error.message);
    return { success: false, data: [] };
  }
};

// send contact message
export const sendContactMessage = async (formData: any) => {
  try {

    const response = await httpClient.post("/contact/send", formData);

    revalidatePath("/dashboard/messages"); 

    const finalData = response?.data || response;

    return {
      success: true,
      message: finalData?.message || "Your message has been sent successfully!",
      data: finalData?.data || finalData,
    };

  } catch (error: any) {

    const errorMessage = error?.response?.data?.message || error.message || "Something went wrong. Please try again.";
    console.error("❌ Error in sendContactMessage action:", errorMessage);

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};






// initiate payment for an event
export const initiatePaymentAction = async (eventId: string | number) => {
  try {
   
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await httpClient.post(
      `/events/initiate-payment/${eventId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `accessToken=${token}`, 
        },
      }
    );

    return {
      success: true,
      data: response.data?.data || response.data 
    };
  } catch (err: any) {
   
    console.error("Payment Error:", err?.response?.data || err.message);
    return { 
      success: false, 
      message: err?.response?.data?.message || "Payment failed" 
    };
  }
};