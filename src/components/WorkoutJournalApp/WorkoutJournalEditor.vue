<template>
    <div>
        <h1>Create/Edit Workout Journal Entry</h1>
        <form @submit.prevent="saveEntry">
            <div>
                <label for="title">Title</label>
                <input v-model="entry.title" type="text" id="title" required />
            </div>
            <div>
                <label for="content">Content</label>                
                <quill-editor v-model="entry.content" :options="editorOptions" @input="updateContent"/>


            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script>
import { quillEditor } from 'vue3-quill';
import tokenSet from '@/api';

export default {
    components: {
        quillEditor,
    },
    data() {
        return {
            entry: {
                title: '',
                content: '',
            },
            editorOptions: {
                placeholder: 'Write something...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image']
                    ]
                }
            }
        };
    },
    methods: {
        updateContent(content) {
            console.log("Content updated:", content);  // 調試輸出，確認內容是否被更新
            this.entry.content = content;
        },
        async saveEntry() {
            try {
                await tokenSet.post('/fitness_api/workout_journal/workout-journals/', this.entry);
                alert('Entry saved successfully!');
            } catch (error) {
                console.error('Error saving entry:', error);
                alert('Failed to save entry.');
            }
        }
    },
    mounted() {
        console.log("Quill Editor Loaded");
    },
    watch: {
        'entry.content': function(newContent) {
            console.log("Content has been updated:", newContent);
        }
    }
};
</script>

<style scoped>
form {
    max-width: 600px;
    margin: 0 auto;
}
label {
    display: block;
    margin: 10px 0 5px;
}
input,
.editor {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
}
button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
</style>
