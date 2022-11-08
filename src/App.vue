<script setup lang="ts">
import { f7, f7ready } from 'framework7-vue'
import $ from 'dom7'
import { ref, reactive, computed, onMounted } from 'vue'
interface message {
  type?: string,
  name?: string,
  text?: string,
  avatar?: string,
  image?: string
}
interface person {
  name: string,
  avatar: string
}
const attachments: string[] = reactive([])
const sheetVisible = ref<boolean>(false)
const typingMessage = ref<null | person>(null)
const messageText = ref<string>('')
const messagebar = ref()
const messagebarIns = ref<any>(null)

const messagesData: message[] = reactive([
  {
    type: 'sent',
    text: 'Hi, Kate',
  },
  {
    type: 'sent',
    text: 'How are you?',
  },
  {
    name: 'Kate',
    type: 'received',
    text: 'Hi, I am good!',
    avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
  },
  {
    name: 'Blue Ninja',
    type: 'received',
    text: 'Hi there, I am also fine, thanks! And how are you?',
    avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
  },
  {
    type: 'sent',
    text: 'Hey, Blue Ninja! Glad to see you ;)',
  },
  {
    type: 'sent',
    text: 'Hey, look, cutest kitten ever!',
  },
  {
    type: 'sent',
    image: 'https://cdn.framework7.io/placeholder/cats-200x260-4.jpg',
  },
  {
    name: 'Kate',
    type: 'received',
    text: 'Nice!',
    avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
  },
  {
    name: 'Kate',
    type: 'received',
    text: 'Like it very much!',
    avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
  },
  {
    name: 'Blue Ninja',
    type: 'received',
    text: 'Awesome!',
    avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
  }
])
const images: string[] = reactive([
  'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
  'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
  'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
  'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
  'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
  'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
  'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
  'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
  'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
  'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg'
])
const people: person[] = reactive([
  {
    name: 'Kate Johnson',
    avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
  },
  {
    name: 'Blue Ninja',
    avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
  }
])
const answers: string[] = reactive([
  'Yes!',
  'No',
  'Hm...',
  'I am not sure',
  'And what about you?',
  'May be ;)',
  'Lorem ipsum dolor sit amet, consectetur',
  'What?',
  'Are you sure?',
  'Of course',
  'Need to think about it',
  'Amazing!!!'
])
const responseInProgress = ref(false)

const attachmentsVisible = computed<boolean>(() => attachments.length > 0)
const placeholder = computed<string>(() => attachments.length > 0 ? 'Add comment or Send' : 'Message')

onMounted(() => {
  f7ready(() => {
    messagebarIns.value = f7.messagebar.get(messagebar.value.$el)
  })
})

const isFirstMessage = (message:any, index:number):boolean => {
  const previousMessage = messagesData[index - 1]
  if (message.isTitle) return false
  if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true
  return false
}

const isLastMessage = (message:any, index:number):boolean => {
  const nextMessage = messagesData[index + 1]
  if (message.isTitle) return false
  if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true
  return false
}

const isTailMessage = (message:any, index:number):boolean => {
  const nextMessage = messagesData[index + 1]
  if (message.isTitle) return false
  if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true
  return false
}

const deleteAttachment = (image:string) => {
  const index = attachments.indexOf(image)
  attachments.splice(index, 1)[0]
}

const handleAttachment = (e:any) => {
  const index = $(e.target).parents('label.checkbox').index()
  const image = images[index]
  if (e.target.checked) {
    attachments.unshift(image)
  } else {
    attachments.splice(attachments.indexOf(image), 1)
  }
}

const sendMessage = () => {
  const text = messageText.value.replace(/\n/g, '<br>').trim()
  const messagesToSend = []
  attachments.forEach((attachment) => {
    messagesToSend.push({
      image: attachment
    })
  })
  if (text.length) {
    messagesToSend.push({
      text
    })
  }
  if (messagesToSend.length === 0) return
  attachments.splice(0, attachments.length)
  sheetVisible.value = false
  messageText.value = ''
  if (text.length) {
    // const a = f7.messagebar.get(messagebar.value.$el)
    messagebarIns.value.focus()
  }
  messagesData.push(...messagesToSend)

  if (responseInProgress.value) return
  responseInProgress.value = true

  setTimeout(() => {
    const answer = answers[Math.floor(Math.random() * answers.length)]
    const person = people[Math.floor(Math.random() * people.length)]
    typingMessage.value = {
      name: person.name,
      avatar: person.avatar
    }
    setTimeout(() => {
      messagesData.push({
        text: answer,
        type: 'received',
        name: person.name,
        avatar: person.avatar
      })
      typingMessage.value = null
      responseInProgress.value = false
    }, 4000);
  }, 1000)
}
</script>

<template>
  <f7-app v-bind="{ theme: 'auto', name: 'Jiu Qian', id: 'jiuqian'}">
    <f7-view main>
      <f7-page>
        <f7-navbar class="text-align-center" title="九千查单" />
        <f7-messagebar
          ref="messagebar"
          v-model:value="messageText"
          :placeholder="placeholder"
          :attachments-visible="attachmentsVisible"
          :sheet-visible="sheetVisible"
        >
          <template #inner-start>
            <f7-link
              icon-f7="camera_fill"
              icon-color="color-theme"
              @click="sheetVisible = !sheetVisible"
            />
          </template>
          <template #inner-end>
            <f7-link
              icon-f7="arrow_up_circle_fill"
              icon-color="color-theme"
              @click="sendMessage"
            />
          </template>
          <f7-messagebar-attachments>
            <f7-messagebar-attachment
              v-for="(image, index) in attachments"
              :key="index"
              :image="image"
              @attachment:delete="deleteAttachment(image)"
            ></f7-messagebar-attachment>
          </f7-messagebar-attachments>
          <f7-messagebar-sheet>
            <f7-messagebar-sheet-image
              v-for="(image, index) in images"
              :key="index"
              :image="image"
              :checked="attachments.indexOf(image) >= 0"
              @change="handleAttachment"
            ></f7-messagebar-sheet-image>
          </f7-messagebar-sheet>
        </f7-messagebar>
        <f7-messages>
          <f7-messages-title><b>Sunday, Feb 9,</b> 12:58</f7-messages-title>
          <f7-message
            v-for="(message, index) in messagesData"
            :key="index"
            :type="message.type"
            :image="message.image"
            :name="message.name"
            :avatar="message.avatar"
            :first="isFirstMessage(message, index)"
            :last="isLastMessage(message, index)"
            :tail="isTailMessage(message, index)"
          >
            <template #text>
              <!-- eslint-disable-next-line -->
              <span v-if="message.text" v-html="message.text"></span>
            </template>
          </f7-message>
          <f7-message
            v-if="typingMessage"
            type="received"
            :typing="true"
            :first="true"
            :last="true"
            :tail="true"
            :header="`${typingMessage.name} is typing`"
            :avatar="typingMessage.avatar"
          ></f7-message>
        </f7-messages>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<style scoped>
</style>
