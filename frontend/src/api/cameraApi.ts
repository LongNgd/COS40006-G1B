import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Camera, CameraStatus } from '../type/camera.type'
import type { Response } from '../type/response.type'
import { User } from '../type/user.type'

export const cameraApi = createApi({
  reducerPath: 'cameraApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  tagTypes: ['Camera', 'Notification'],
  endpoints: (build) => ({
    getCameraByUser: build.query<Response<Camera[]>, User>({
      query: (body) => ({
        url: `camera/getCameraByUserID`,
        method: 'POST',
        body,
      }),
      providesTags: ['Camera'],
    }),
    getUnassignCameraByUser: build.query<Response<Camera[]>, User>({
      query: (userInfo) => ({
        url: 'camera/getUnassignedCamera',
        method: 'POST',
        body: userInfo,
      }),
      providesTags: ['Camera'],
    }),
    updateCameraStatus: build.mutation<Response<Camera>, CameraStatus>({
      query: (userInfo) => ({
        url: 'camera/toggleCameraStatus',
        method: 'PUT',
        body: userInfo,
      }),
      invalidatesTags: ['Camera'],
    }),
    assignCamera: build.mutation<Response<Camera>, User & CameraStatus>({
      query: (userInfo) => ({
        url: 'camera/assignCameraToUser',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['Camera'],
    }),
  }),
})

export const {
  useGetCameraByUserQuery,
  useGetUnassignCameraByUserQuery,
  useUpdateCameraStatusMutation,
  useAssignCameraMutation,
} = cameraApi
