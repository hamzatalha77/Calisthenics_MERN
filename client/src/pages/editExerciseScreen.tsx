import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { EXERCISE_CREATE_RESET } from '../constants/ExerciseConstants'
import { updateExercise } from '../actions/exerciseActions'

interface RootState {
  exerciseCreate: {
    loading: boolean
    success: boolean
    error: boolean
  }
}
const EditExercise = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [video, setVideo] = useState<string>('')
  const [muscles, setMuscles] = useState<string>('')
  const [technique, setTechnique] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [sets, setSets] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [imagesToUpload, setImagesToUpload] = useState<File[]>()
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch<any>>()
  return <div></div>
}

export default EditExercise
