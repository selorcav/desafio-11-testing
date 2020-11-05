import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import { Auth } from "@/services/Auth"
import Login from '@/views/Login.vue'

import VueRouter from 'vue-router'
import myRoutes from "./mocks/routes"

const localVue = createLocalVue()

localVue.use(VueRouter)

const router = new VueRouter(myRoutes)

describe ('Login.vue',() => {
it ('Muestra mensaje de error con credenciales incorrectas', () => {
        const wrapper = shallowMount (Login)
        wrapper.setData({credentials: {email: '', password: ''}})
        wrapper.find('button').trigger('click')
        expect(wrapper.text()).to.include('Usuario o Contraseña incorrectos, Intente nuevamente.')
}),
it ('No muestra mensaje de error con credenciales correctas y redirecciona al home', async () => {
    sinon.stub(Auth, 'login').resolves({status:200})
    const fakePush = sinon.spy(router, 'push') 
    const wrapper = shallowMount (Login, (router, localVue))
    wrapper.setData({credentials: {email:'hola@gmail.cl', password:'123123'}})
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).to.not.include('Usuario o Contraseña incorrectos, Intente nuevamente.')
    expect(fakePush.called).to.equals(1)
})
})