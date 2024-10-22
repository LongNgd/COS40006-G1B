import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Camera, CameraStatus } from '../type/camera.type'
import { Response } from '../type/response.type'
import { User } from '../type/user.type'

export const cameraApi = createApi({
  reducerPath: 'cameraApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  tagTypes: ['Camera', 'Notification'],
  endpoints: (build) => ({
    getCameraByUser: build.mutation<Response<Camera[]>, User>({
      query: (userInfo) => ({
        url: 'camera/getCameraByUserID',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['Camera'],
    }),
    getUnassignCameraByUser: build.mutation<Response<Camera[]>, User>({
      query: (userInfo) => ({
        url: 'camera/api/getUnassignedCamera',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['Camera'],
    }),
    getCameraStatus: build.mutation<Response<Camera>, CameraStatus>({
      query: (userInfo) => ({
        url: 'camera/toggleCameraStatus',
        method: 'PUT',
        body: userInfo,
      }),
      invalidatesTags: ['Camera'],
    }),
  }),
})

export const {
  useGetCameraByUserMutation,
  useGetUnassignCameraByUserMutation,
  useGetCameraStatusMutation,
} = cameraApi
